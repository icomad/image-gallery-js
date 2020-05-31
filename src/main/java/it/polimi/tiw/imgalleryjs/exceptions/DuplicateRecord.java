package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class DuplicateRecord {
    private String error = "Duplicate record!";
    private String field = "all";
    private int status = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;

    public DuplicateRecord() {}
}
