package com.withub.util;


import com.mchange.v2.c3p0.ComboPooledDataSource;
import com.withub.model.system.config.DatabaseConfigInfo;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.logging.Logger;

public final class JdbcPoolProvider {

    public static Logger logger = Logger.getLogger(JdbcPoolProvider.class.getName());

    private DataSource dataSource = null;

    private JdbcPoolProvider() {

        this.dataSource = initDataSource();
    }

    private static class JdbcPoolProviderCreateInstance {

        private static JdbcPoolProvider instance = new JdbcPoolProvider();
    }

    public static JdbcPoolProvider getJdbcPoolProviderInstance() {

        return JdbcPoolProviderCreateInstance.instance;
    }

    public Connection getSqlConnection() {

        Connection connection = null;
        return connection;
    }

    private DataSource initDataSource() {

        ComboPooledDataSource dataSource = new ComboPooledDataSource();

        return dataSource;
    }
}
