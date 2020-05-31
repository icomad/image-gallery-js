package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class ImageBlank {
    private String error = "An image is required and can not be blank!";
    private String field = "imageField";
    private int status = HttpServletResponse.SC_BAD_REQUEST;

    public ImageBlank() {}
}
