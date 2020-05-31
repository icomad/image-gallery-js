package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class ImageDescriptionBlank {
    private String error = "Image description is required and can not be blank!";
    private String field = "description";
    private int status = HttpServletResponse.SC_BAD_REQUEST;

    public ImageDescriptionBlank() {}
}
