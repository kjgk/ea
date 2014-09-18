package com.withub.service.impl.ea;

import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.DataExportInfo;
import com.withub.model.ea.Metasys;
import com.withub.model.ea.PointActualValue;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.service.ea.ConfigurationService;
import com.withub.service.ea.MetasysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileWriter;


@Service("MetasysService")
@Transactional
public class MetasysServiceImpl implements MetasysService {

    @Autowired
    private EntityDao entityDao;

    @Autowired
    private ConfigurationService configurationService;


    public Metasys getMetasysById(final String objectId) {

        return entityDao.getObject(Metasys.class, objectId);
    }

    public void saveMetasys(Metasys metasys) {

        metasys.setObjectId("METASYS");
        entityDao.save(metasys);
    }

    public DataExportInfo exportReg() throws Exception {

        String reg = null;
        Metasys metasys = getMetasysById("METASYS");

        // 64位
        if (metasys.getBit() == 1) {

            reg = "Windows Registry Editor Version 5.00\n"
                    + "\n"
                    + "[HKEY_CLASSES_ROOT\\metasys]\n"
                    + "\"URL Protocol\"=\"C:\\\\Program Files (x86)\\\\Internet Explorer\\\\iexplore.exe\"\n"
                    + "@=\"IE Protocol\"\n"
                    + "\n"
                    + "[HKEY_CLASSES_ROOT\\metasys\\shell]\n"
                    + "\n"
                    + "[HKEY_CLASSES_ROOT\\metasys\\shell\\open]\n"
                    + "\n"
                    + "[HKEY_CLASSES_ROOT\\metasys\\shell\\open\\command]\n"
                    + "@=\"\\\"C:\\\\Program Files (x86)\\\\Internet Explorer\\\\iexplore.exe\\\" "
                    + metasys.getIp()
                    + "/metasys\"\n"
                    + "\n";
        }
        // 32位
        else {

            reg = "Windows Registry Editor Version 5.00\n"
                    + "\n"
                    + "[HKEY_CLASSES_ROOT\\metasys]\n"
                    + "\"URL Protocol\"=\"C:\\\\Program Files\\\\Internet Explorer\\\\iexplore.exe\"\n"
                    + "@=\"IE Protocol\"\n"
                    + "\n"
                    + "[HKEY_CLASSES_ROOT\\metasys\\shell]\n"
                    + "\n"
                    + "[HKEY_CLASSES_ROOT\\metasys\\shell\\open]\n"
                    + "\n"
                    + "[HKEY_CLASSES_ROOT\\metasys\\shell\\open\\command]\n"
                    + "@=\"\\\"C:\\\\Program Files\\\\Internet Explorer\\\\iexplore.exe\\\" " + metasys.getIp() + "/metasys\"\n"
                    + "\n";
        }

        SystemConfigInfo systemConfigInfo = (SystemConfigInfo) configurationService.getConfigInfo(SystemConfigInfo.class.getName(), "SYSTEM");
        String tempFileName = StringUtil.getUuid();

        FileWriter fileWriter = null;

        try {
            fileWriter = new FileWriter(systemConfigInfo.getTempDirectory() + "/" + tempFileName);

            fileWriter.write(reg);

            fileWriter.flush();
            fileWriter.close();

            DataExportInfo dataExportInfo = new DataExportInfo();
            dataExportInfo.setTempFileName(tempFileName);
            dataExportInfo.setType(PointActualValue.class.getSimpleName());
            dataExportInfo.setFileName("metasys.reg");
            return dataExportInfo;

        } catch (Exception e) {
            throw e;
        } finally {
            if (fileWriter != null) {
                fileWriter.close();
            }
        }
    }

}
