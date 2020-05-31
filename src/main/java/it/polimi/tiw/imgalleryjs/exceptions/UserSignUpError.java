package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class UserSignUpError {
    private String error = "Error during sign up! Please try again";
    private String field = "all";
    private int status = HttpServletResponse.SC_BAD_REQUEST;

    public UserSignUpError() {}
}
