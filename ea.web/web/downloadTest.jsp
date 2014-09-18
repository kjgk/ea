<%@page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8" import="java.io.*"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<body>
<%
    OutputStream o=response.getOutputStream();
    byte b[]=new byte[1000000];
//    File fileLoad=new File("D:\\"+"testPdf.pdf");
//    response.setHeader("Content-disposition","inline;filename="+"testPdf.pdf");
    File fileLoad=new File("D:\\"+"testDoc.doc");
    response.setHeader("Content-disposition","inline;filename="+"testDoc.doc");
    response.setContentType("application/octet-stream");
    long fileLength=fileLoad.length();
    String length=String.valueOf(fileLength);
    response.setHeader("Content_Length",length);
    FileInputStream in=new FileInputStream(fileLoad);
    int n=0;
    while((n=in.read(b))!=-1)
    {
        o.write(b,0,n);
    }
%>
</body>
</html>


