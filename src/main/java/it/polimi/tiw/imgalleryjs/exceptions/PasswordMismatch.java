package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class PasswordMismatch {
    private String error = "Passwords do not match!";
    private String field = "confirmPassword";
    private int status = HttpServletResponse.SC_BAD_REQUEST;

    public PasswordMismatch() {}
}
