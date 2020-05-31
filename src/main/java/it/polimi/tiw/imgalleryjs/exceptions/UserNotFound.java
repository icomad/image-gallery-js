package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class UserNotFound {
    private String error = "User not found! Incorrect username/password!";
    private String field = "all";
    private int status = HttpServletResponse.SC_UNAUTHORIZED;

    public UserNotFound() {}
}
