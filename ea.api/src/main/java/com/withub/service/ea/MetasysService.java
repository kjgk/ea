package com.withub.service.ea;


import com.withub.model.DataExportInfo;
import com.withub.model.ea.Metasys;


public interface MetasysService {

    public Metasys getMetasysById(final String objectId);

    public void saveMetasys(Metasys metasys);

    public DataExportInfo exportReg() throws Exception;

}
