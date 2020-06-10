package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class ImageIdBlank {
    private String error = "Image id is required and can not be blank!";
    private String field = "id";
    private int status = HttpServletResponse.SC_BAD_REQUEST;

    public ImageIdBlank() {}
}
