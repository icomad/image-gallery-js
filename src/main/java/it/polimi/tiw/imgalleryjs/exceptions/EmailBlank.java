package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class EmailBlank {
    private String error = "Email is required and can not be blank!";
    private String field = "email";
    private int status = HttpServletResponse.SC_BAD_REQUEST;

    public EmailBlank() {}
}
