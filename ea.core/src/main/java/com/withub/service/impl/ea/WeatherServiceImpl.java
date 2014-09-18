package com.withub.service.impl.ea;

import com.alibaba.fastjson.JSONObject;
import com.withub.common.util.DateUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.WeatherInfo;
import com.withub.service.ea.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Date;
import java.util.List;


@Service("weatherService")
public class WeatherServiceImpl implements WeatherService {

    //===================== 属性声明 ========================================================

    @Autowired
    private EntityDao entityDao;

    //===================== 接口方法 ========================================================

    public WeatherInfo getWeatherInfoByDataPoint(String humidityDataPointID, String temperatureDataPointID) throws Exception {

        WeatherInfo weatherInfo = new WeatherInfo();
        Double temperature = fetchSinglePointLatestActualValue(temperatureDataPointID);
        Double humidity = fetchSinglePointLatestActualValue(humidityDataPointID);

        weatherInfo.setHighTemperature(temperature.toString() + "℃");
        weatherInfo.setHumidity(humidity.toString() + "%");
        weatherInfo.setImageNo(null);
        return weatherInfo;
    }

    public WeatherInfo getWeatherInfoByCityCode(String cityCode) throws Exception {

        WeatherInfo weatherInfo = new WeatherInfo();

        String urlString = "http://m.weather.com.cn/data/" + cityCode + ".html";

        URL url = null;
        try {
            url = new URL(urlString);
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));

            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                sb.append(line);
            }
            bufferedReader.close();

            JSONObject jsonObject = JSONObject.parseObject(sb.toString());

            weatherInfo.setHighTemperature(jsonObject.getJSONObject("weatherinfo").getString("temp1").split("~")[0]);
            weatherInfo.setImageNo(jsonObject.getJSONObject("weatherinfo").getString("img1"));

            urlString = "http://www.weather.com.cn/data/sk/" + cityCode + ".html";

            url = new URL(urlString);
            bufferedReader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));

            sb = new StringBuilder();

            while ((line = bufferedReader.readLine()) != null) {
                sb.append(line);
            }
            bufferedReader.close();

            jsonObject = JSONObject.parseObject(sb.toString());
            weatherInfo.setHumidity(jsonObject.getJSONObject("weatherinfo").getString("SD"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return weatherInfo;
    }

    public JSONObject getWeatherByCityCode(final String cityCode) throws Exception {

        String urlString = "http://m.weather.com.cn/data/" + cityCode + ".html";

        // 湿度 http://www.weather.com.cn/data/sk/101020100.html
        URL url = new URL(urlString);
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(url.openStream(), "UTF-8"));

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            sb.append(line);
        }
        bufferedReader.close();

        JSONObject jsonObject = JSONObject.parseObject(sb.toString());
        return jsonObject;

    }

    private Double fetchSinglePointLatestActualValue(String dataPointId) throws Exception {

        Double latestActualValue = 0.0;
        Date currentTime = DateUtil.getCurrentTime();
        String tableName = "ea_pointactualvalue";

        String sql = "select ActualValue from " + tableName + " where 1=1"
                + " and pointId = " + Integer.parseInt(dataPointId)
                + " and UTCDateTime <= timestamp '" + DateUtil.getDateFormatString(currentTime, DateUtil.STANDARD_DATETIME_FORMAT) + "' "
                + " order by UTCDateTime desc limit 1";
        //Timestamp timestamp = new Timestamp(DateUtil.addHours(new Date(), -3).getTime());
        List list = entityDao.listBySql(sql);
        if (list.size() > 0) {
            latestActualValue = Double.parseDouble(list.get(0).toString());
        }
        return Double.valueOf(String.format("%.1f", latestActualValue));
    }
}
