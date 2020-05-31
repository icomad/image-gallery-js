package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class AlbumNotFound {
    private String error = "Album not found! Incorrect id!";
    private String field = "all";
    private int status = HttpServletResponse.SC_UNAUTHORIZED;

    public AlbumNotFound() {}
}
