package com.withub.common.util;


import org.hyperic.sigar.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public final class SystemUtil {

    private final static Logger logger = LoggerFactory.getLogger(SystemUtil.class);

    /**
     * 获取CPU个数
     *
     * @return
     * @throws Exception
     */
    public static int getCpuCount() throws Exception {

        Sigar sigar = new Sigar();
        try {
            return sigar.getCpuInfoList().length;
        } finally {
            sigar.close();
        }
    }

    /**
     * 获取CPU使用率
     *
     * @return
     */
    public static List<SystemCpuInfo> getCpuUtilization() throws Exception {

        Sigar sigar = new Sigar();
        List<SystemCpuInfo> systemCpuInfoList = new ArrayList<SystemCpuInfo>();
        try {
            CpuPerc[] cpuList = sigar.getCpuPercList();
            if (CollectionUtil.isNotEmpty(cpuList)) {
                for (CpuPerc cpuPerc : cpuList) {
                    SystemCpuInfo systemCpuInfo = new SystemCpuInfo();
                    systemCpuInfo.setUser(CpuPerc.format(cpuPerc.getUser()));
                    systemCpuInfo.setSys(CpuPerc.format(cpuPerc.getSys()));
                    systemCpuInfo.setWait(CpuPerc.format(cpuPerc.getWait()));
                    systemCpuInfo.setIdle(CpuPerc.format(cpuPerc.getIdle()));
                    systemCpuInfo.setCombined(CpuPerc.format(cpuPerc.getCombined()));
                    systemCpuInfoList.add(systemCpuInfo);
                }
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            sigar.close();
        }
        return systemCpuInfoList;
    }

    /**
     * 获取系统信息
     *
     * @return
     * @throws Exception
     */
    public static OperatingSystem getOperateSystemInfo() throws Exception {

        return OperatingSystem.getInstance();
    }

    /**
     * 获取系统内存信息
     *
     * @return
     * @throws Exception
     */
    public static Mem getSystemMemoryInfo() throws Exception {

        Sigar sigar = null;
        try {
            sigar = new Sigar();
            return sigar.getMem();
        } finally {
            if (sigar != null) {
                sigar.close();
            }
        }
    }

    /**
     * 获取系统页面文件交换区
     *
     * @return
     * @throws Exception
     */
    public static Swap getSystemSwapInfo() throws Exception {

        Sigar sigar = null;
        try {
            sigar = new Sigar();
            return sigar.getSwap();
        } finally {
            if (sigar != null) {
                sigar.close();
            }
        }
    }

    /**
     * 获取系统硬盘信息
     *
     * @return
     * @throws Exception
     */
    public static List<SystemDiskInfo> getSystemDiskInfo() {

        List<SystemDiskInfo> systemDiskInfoList = new ArrayList<SystemDiskInfo>();
        Sigar sigar = new Sigar();
        try {
            FileSystem[] fslist = sigar.getFileSystemList();
            for (FileSystem fileSystem : fslist) {
                if (fileSystem.getType() != 2) {
                    continue;
                }
                SystemDiskInfo systemDiskInfo = new SystemDiskInfo();
                systemDiskInfo.setDiskName(fileSystem.getDirName());
                systemDiskInfo.setSysTypeName(fileSystem.getSysTypeName());
                systemDiskInfo.setTypeName(fileSystem.getTypeName().equalsIgnoreCase("local") ? "本地磁盘" : fileSystem.getTypeName());
                FileSystemUsage usage = sigar.getFileSystemUsage(fileSystem.getDirName());
                systemDiskInfo.setTotalSize(usage.getTotal());
                systemDiskInfo.setFreeSize(usage.getFree());
                systemDiskInfo.setAvailSize(usage.getAvail());
                systemDiskInfo.setUsedSize(usage.getUsed());
                systemDiskInfo.setUsePercent(usage.getUsePercent());
                systemDiskInfoList.add(systemDiskInfo);
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (sigar != null) {
                sigar.close();
            }
        }
        return systemDiskInfoList;
    }

    /**
     * 获取系统的MAC地址(单个)
     *
     * @return
     */
    public static String getMacAddress() {

        String macAddress = "";
        Sigar sigar = null;
        try {
            sigar = new Sigar();
            String[] ifaces = sigar.getNetInterfaceList();
            for (int i = 0; i < ifaces.length; i++) {
                NetInterfaceConfig cfg = sigar.getNetInterfaceConfig(ifaces[i]);

                if (NetFlags.LOOPBACK_ADDRESS.equals(cfg.getAddress())
                        || (cfg.getFlags() & NetFlags.IFF_LOOPBACK) != 0
                        || NetFlags.NULL_HWADDR.equals(cfg.getHwaddr())
                        || NetFlags.ANY_ADDR.equals(cfg.getAddress())
                        || NetFlags.ANY_ADDR_V6.equals(cfg.getAddress())
                        || cfg.getDescription().contains("Virtual")) {
                    continue;
                }
                macAddress = cfg.getHwaddr();
                //System.out.println(cfg);
                break;
            }
        } catch (Throwable e) {
            logger.info("获取Mac地址出错:" + e);
            macAddress = "";
        } finally {
            if (sigar != null) {
                sigar.close();
            }
        }
        return macAddress;
    }

    /**
     * 获取唯一码(单个)
     *
     * @return
     */
    public static String getUniqueCode(String... clientKey) {

        String singleCode = "";
        String clientKeys = "";
        for (String s : clientKey) {
            clientKeys += s;
        }
        String salt = "Withub@951BA2" + clientKeys;
        singleCode = getMacAddress();
        if (StringUtil.isEmpty(singleCode)) {
            singleCode = "无法获取机器唯一码！";
        } else {
            singleCode = Md5Util.getStringMD5(getMacAddress() + salt).toUpperCase();
        }
        return singleCode;
    }

    /**
     * 获取系统的MAC地址(多个)
     *
     * @return
     */
    public static String getMacAddresses() {

        String macAddress = "";
        List<String> macAddressList = new ArrayList<String>();
        Sigar sigar = null;
        try {
            sigar = new Sigar();
            String[] ifaces = sigar.getNetInterfaceList();
            for (int i = 0; i < ifaces.length; i++) {
                NetInterfaceConfig cfg = sigar.getNetInterfaceConfig(ifaces[i]);

                if (NetFlags.LOOPBACK_ADDRESS.equals(cfg.getAddress())
                        || (cfg.getFlags() & NetFlags.IFF_LOOPBACK) != 0
                        || NetFlags.NULL_HWADDR.equals(cfg.getHwaddr())
//                        || NetFlags.ANY_ADDR.equals(cfg.getAddress())
                        || NetFlags.ANY_ADDR_V6.equals(cfg.getAddress())
                        || cfg.getDescription().contains("Virtual")) {
                    continue;
                }
                if (!macAddressList.contains(cfg.getHwaddr())) {
//                    System.out.println(cfg);
                    macAddressList.add(cfg.getHwaddr());
                    macAddress += "," + cfg.getHwaddr();
                }
            }
        } catch (Throwable e) {
            logger.info("获取Mac地址出错:" + e);
            macAddress = "";
        } finally {
            if (sigar != null) {
                sigar.close();
            }
        }
        return StringUtil.isEmpty(macAddress) ? macAddress : macAddress.substring(1);
    }

    /**
     * 获取唯一码(多个)
     *
     * @return
     */
    public static String getUniqueCodes(String... clientKey) {

        String singleCodes = getMacAddresses();
        String clientKeys = "";
        for (String s : clientKey) {
            clientKeys += s;
        }
        String uniqueCodes = "";
        String salt = "Withub@951BA2" + clientKeys;
        if (StringUtil.isEmpty(singleCodes)) {
            uniqueCodes = "无法获取机器唯一码！";
        } else {
            String singleCode[] = singleCodes.split(",");
            for (int i = 0; i < singleCode.length; i++) {
                uniqueCodes += "," + Md5Util.getStringMD5(singleCode[i] + salt).toUpperCase();
            }
            uniqueCodes = StringUtil.isEmpty(uniqueCodes) ? uniqueCodes : uniqueCodes.substring(1);
        }
        return uniqueCodes;
    }

    /**
     * 授权验证
     *
     * @return
     */
    public static boolean authorize(String uniqueCodes, String authorizationCodes, String clientKey) {

        if (StringUtil.isEmpty(authorizationCodes)) {
            return false;
        }
        String uniqueCode[] = uniqueCodes.split(",");
        List<String> systemCodeList = new ArrayList<String>();
        for (String s : uniqueCode) {
            systemCodeList.add(Md5Util.getStringMD5(clientKey + s).toUpperCase());
        }
        String authorizationCode[] = authorizationCodes.split(",");
        for (String s : authorizationCode) {
            if (systemCodeList.contains(s)) {
                return true;
            }
        }
        return false;
    }
}
