package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class AlbumTitleBlank {
    private String error = "Album title is required and can not be blank!";
    private String field = "title";
    private int status = HttpServletResponse.SC_BAD_REQUEST;

    public AlbumTitleBlank() {}
}
