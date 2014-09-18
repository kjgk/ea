package com.withub.common.util;


public class SystemDiskInfo {

    private String diskName;

    private String sysTypeName;

    private String typeName;

    private Long totalSize;

    private Long freeSize;

    private Long availSize;

    private Long usedSize;

    private Double usePercent;

    public String getDiskName() {

        return diskName;
    }

    public void setDiskName(String diskName) {

        this.diskName = diskName;
    }

    public String getSysTypeName() {

        return sysTypeName;
    }

    public void setSysTypeName(String sysTypeName) {

        this.sysTypeName = sysTypeName;
    }

    public String getTypeName() {

        return typeName;
    }

    public void setTypeName(String typeName) {

        this.typeName = typeName;
    }

    public Long getTotalSize() {

        return totalSize;
    }

    public void setTotalSize(Long totalSize) {

        this.totalSize = totalSize;
    }

    public Long getFreeSize() {

        return freeSize;
    }

    public void setFreeSize(Long freeSize) {

        this.freeSize = freeSize;
    }

    public Long getAvailSize() {

        return availSize;
    }

    public void setAvailSize(Long availSize) {

        this.availSize = availSize;
    }

    public Long getUsedSize() {

        return usedSize;
    }

    public void setUsedSize(Long usedSize) {

        this.usedSize = usedSize;
    }

    public Double getUsePercent() {

        return usePercent;
    }

    public void setUsePercent(Double usePercent) {

        this.usePercent = usePercent;
    }
}
