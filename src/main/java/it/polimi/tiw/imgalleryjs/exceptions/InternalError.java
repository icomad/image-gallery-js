package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class InternalError {
    private String error = "Internal Error!";
    private String field = "all";
    private int status = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;

    public InternalError() {}
}
