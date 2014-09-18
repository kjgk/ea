package com.withub.service.ea;


import com.alibaba.fastjson.JSONObject;
import com.withub.model.ea.WeatherInfo;

public interface WeatherService {

    public WeatherInfo getWeatherInfoByDataPoint(String humidityDataPointID, String temperatureDataPointID) throws Exception;

    public WeatherInfo getWeatherInfoByCityCode(final String cityCode) throws Exception;

    public JSONObject getWeatherByCityCode(final String cityCode) throws Exception;

}
