package com.withub.model.ea;


import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "EA_METASYS")
public class Metasys extends AbstractEntity {

    private String ip;

    private Integer bit;

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public Integer getBit() {
        return bit;
    }

    public void setBit(Integer bit) {
        this.bit = bit;
    }
}
