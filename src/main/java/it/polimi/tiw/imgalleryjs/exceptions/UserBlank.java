package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class UserBlank {
    private String error = "Username is required and can not be blank!";
    private String field = "username";
    private int status = HttpServletResponse.SC_BAD_REQUEST;

    public UserBlank() {}
}
