package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class ImageNotFound {
    private String error = "Image not found! Incorrect id!";
    private String field = "all";
    private int status = HttpServletResponse.SC_UNAUTHORIZED;

    public ImageNotFound() {}
}
