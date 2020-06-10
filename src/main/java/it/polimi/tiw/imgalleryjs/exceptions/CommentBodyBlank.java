package it.polimi.tiw.imgalleryjs.exceptions;

import javax.servlet.http.HttpServletResponse;

public class CommentBodyBlank {
    private String error = "Comment body is required and can not be blank!";
    private String field = "body";
    private int status = HttpServletResponse.SC_BAD_REQUEST;

    public CommentBodyBlank() {}
}
