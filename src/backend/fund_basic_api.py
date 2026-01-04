@router.get("/fund/basic") 
async def get_fund_basic( 
    # 分页参数 
    page: int = Query(1, ge=1, description="页码"), 
    page_size: int = Query(10, ge=1, le=100, description="每页条数"), 
    # 过滤参数 
    fund_code: Optional[str] = Query(None, description="基金代码"), 
    fund_name: Optional[str] = Query(None, description="基金名称，支持模糊查询"), 
    fund_type: Optional[int] = Query(None, description="基金类型"), 
    company_id: Optional[int] = Query(None, description="基金公司ID"), 
    company_name: Optional[str] = Query(None, description="基金公司名称，支持模糊查询"), 
    is_purchaseable: Optional[bool] = Query(None, description="是否可购买"), 
    # 排序参数 
    sort_by: Optional[str] = Query( 
        None, description="排序字段，如 latest_nav, daily_growth, created_at" 
    ), 
    sort_order: str = Query("asc", description="排序方式，asc 或 desc"), 
    db: Session = Depends(get_db), 
): 
    """ 
    查询基金基本信息列表，支持分页、多条件过滤和排序 
    """ 
    try: 
        query = db.query(FundBasic, FundRank).join( 
            FundRank, FundBasic.id == FundRank.fund_id, isouter=True  # 使用外连接，确保没有排名数据的基金也能返回
        ) 

        # 应用过滤条件 
        if fund_code: 
            query = query.filter(FundBasic.fund_code == fund_code) 
        if fund_name: 
            query = query.filter(FundBasic.fund_name.ilike(f"%{fund_name}%")) 
        if fund_type: 
            query = query.filter(FundBasic.fund_type == fund_type) 
        if company_id: 
            query = query.filter(FundBasic.company_id == company_id) 
        if company_name: 
            query = query.filter(FundBasic.company_name.ilike(f"%{company_name}%")) 
        if is_purchaseable is not None: 
            query = query.filter(FundBasic.is_purchaseable == is_purchaseable) 

        # 应用排序 
        if sort_by: 
            order_func = None 
            # 检查排序字段来自哪个表 
            if hasattr(FundBasic, sort_by): 
                # 来自FundBasic表的字段 
                order_func = getattr(FundBasic, sort_by) 
            elif hasattr(FundRank, sort_by): 
                # 来自FundRank表的字段 
                order_func = getattr(FundRank, sort_by) 
            
            if order_func: 
                # 根据排序方式应用asc或desc 
                if sort_order.lower() == "desc": 
                    order_func = desc(order_func) 
                query = query.order_by(order_func) 
            else: 
                # 排序字段不存在，返回默认排序 
                query = query.order_by(desc(FundBasic.created_at)) 
        else: 
            # 默认按创建时间排序 
            query = query.order_by(desc(FundBasic.created_at)) 

        # 计算总数 
        total = query.count() 

        # 应用分页 
        offset = (page - 1) * page_size 
        funds = query.offset(offset).limit(page_size).all() 

        # 构建响应 
        result = { 
            "total": total, 
            "page": page, 
            "page_size": page_size, 
            "total_pages": (total + page_size - 1) // page_size, 
            "data": [ 
                { 
                    "id": fund.id, 
                    "fund_code": fund.fund_code, 
                    "short_name": fund.short_name, 
                    "fund_name": fund.fund_name, 
                    "fund_type": fund.fund_type, 
                    "pinyin": fund.pinyin, 
                    "manager": fund.manager, 
                    "company_id": fund.company_id, 
                    "company_name": fund.company_name, 
                    "launch_date": fund.launch_date, 
                    "latest_nav": fund.latest_nav, 
                    "latest_nav_date": fund.latest_nav_date, 
                    "is_purchaseable": fund.is_purchaseable, 
                    "purchase_start_date": fund.purchase_start_date, 
                    "purchase_end_date": fund.purchase_end_date, 
                    "purchase_min_amount": fund.purchase_min_amount, 
                    "redemption_min_amount": fund.redemption_min_amount, 
                    "risk_level": fund.risk_level, 
                    "purchase_fee": fund.purchase_fee, 
                    "redemption_fee": fund.redemption_fee, 
                    "purchase_fee_rate": fund.purchase_fee_rate, 
                    "daily_growth": rank.daily_growth if rank else None, 
                    "created_at": fund.created_at, 
                    "updated_at": fund.updated_at, 
                } 
                for fund, rank in funds 
            ], 
        } 

        return result 

    except HTTPException: 
        raise 
    except Exception as e: 
        logger.error(f"查询基金基本信息失败: {str(e)}") 
        raise HTTPException(status_code=500, detail="查询基金基本信息失败")