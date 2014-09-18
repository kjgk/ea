package com.withub.hibernate;


import org.hibernate.dialect.SQLServerDialect;
import org.hibernate.type.StringType;

import java.sql.Types;


public class SqlServer2008Dialect extends SQLServerDialect {

    public SqlServer2008Dialect() {
        super();
        registerHibernateType(Types.NVARCHAR, StringType.INSTANCE.getName());
    }
}
