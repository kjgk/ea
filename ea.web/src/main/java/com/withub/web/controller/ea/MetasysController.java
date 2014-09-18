package com.withub.web.controller.ea;

import com.withub.model.DataExportInfo;
import com.withub.model.ea.Metasys;
import com.withub.service.ea.MetasysService;
import com.withub.web.common.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/ea")
public class MetasysController extends BaseController {

    //===================== 属性声明 ==========================================================

    @Autowired
    private MetasysService metasysService;

    //===================== Controller方法 ====================================================

    @RequestMapping(value = "/metasys/load", method = RequestMethod.GET)
    public void loadMetasys(ModelMap modelMap) throws Exception {

        Metasys metasys = metasysService.getMetasysById("METASYS");

        Map<String, Object> data = new HashMap<String, Object>();
        if (metasys != null) {
            data.put("ip", metasys.getIp());
            data.put("bit", metasys.getBit());
            modelMap.put("hasData", true);
        } else {
            modelMap.put("hasData", false);
        }

        modelMap.put("data", data);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/metasys/save", method = RequestMethod.POST)
    public void saveMetasys(ModelMap modelMap, Metasys metasys) throws Exception {

        metasysService.saveMetasys(metasys);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/metasys/export", method = RequestMethod.GET)
    public void exportUserDataPoint(ModelMap modelMap) throws Exception {

        DataExportInfo dataExportInfo = metasysService.exportReg();
        modelMap.put("data", dataExportInfo);
    }

}

