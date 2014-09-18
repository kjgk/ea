package com.withub.web.controller.ea;


import com.withub.model.ea.WeatherInfo;
import com.withub.service.ea.WeatherService;
import com.withub.util.ConfigUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/ea/weather")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @RequestMapping(value = "/getWeather", method = RequestMethod.POST)
    public void selectWeatherByCityCode(ModelMap modelMap) throws Exception {

        WeatherInfo weatherInfo = new WeatherInfo();
        String priority = ConfigUtil.getWeatherConfigInfo().getPriority();
        if (priority != null && priority.equals("0")) { //数据点
            String humidityDataPointID = ConfigUtil.getWeatherConfigInfo().getHumidityDataPoint();
            String temperatureDataPointID = ConfigUtil.getWeatherConfigInfo().getTemperatureDataPoint();
            weatherInfo = weatherService.getWeatherInfoByDataPoint(humidityDataPointID, temperatureDataPointID);
        } else { //Web
            String cityCode = ConfigUtil.getWeatherConfigInfo().getCityCode();
            weatherInfo = weatherService.getWeatherInfoByCityCode(cityCode);
        }
        modelMap.put("weatherInfo", weatherInfo);
    }
}
