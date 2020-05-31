package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class ImageTitleBlank {
    private String error = "Image title is required and can not be blank!";
    private String field = "title";
    private int status = HttpServletResponse.SC_BAD_REQUEST;

    public ImageTitleBlank() {}
}
