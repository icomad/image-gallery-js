package it.polimi.tiw.imgalleryjs.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import it.polimi.tiw.imgalleryjs.beans.User;
import it.polimi.tiw.imgalleryjs.exceptions.AlbumIdBlank;
import it.polimi.tiw.imgalleryjs.exceptions.AlbumTitleBlank;
import it.polimi.tiw.imgalleryjs.exceptions.InternalError;
import it.polimi.tiw.imgalleryjs.services.AlbumService;
import it.polimi.tiw.imgalleryjs.utils.SQLExceptionHandler;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/albums")
@MultipartConfig
public class AlbumController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        this.gson = new Gson();
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        var out = response.getWriter();
        var albumId = request.getParameter("albumId");
        var newOrder = request.getParameter("newOrder");

        if (albumId == null || albumId.isBlank() || newOrder == null || newOrder.isBlank()){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(this.gson.toJson(new AlbumIdBlank()));
            out.flush();
            return;
        }

        var albumService = new AlbumService();
        try {
            albumService.updateOrder(Integer.parseInt(albumId), Integer.parseInt(newOrder));
            response.setStatus(HttpServletResponse.SC_OK);
            var json = new JsonObject();
            json.addProperty("status", 200);
            out.print(json);
            out.flush();
        } catch (SQLException e) {
            SQLExceptionHandler.evaluateError(e, response, gson);
        } catch (NumberFormatException e){
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(this.gson.toJson(new InternalError()));
            out.flush();
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        var out = response.getWriter();
        var title = request.getParameter("title");

        if (title == null || title.isBlank()){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(this.gson.toJson(new AlbumTitleBlank()));
            out.flush();
            return;
        }

        var user = (User) request.getSession().getAttribute("user");
        var albumService = new AlbumService();
        try {
            var album = albumService.create(title, user.getId());
            if (album == null){
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                var json = new JsonObject();
                json.addProperty("error", "Error while adding album. Please try again");
                out.print(json);
                out.flush();
                return;
            }
            response.setStatus(HttpServletResponse.SC_OK);
            out.print(this.gson.toJson(album));
            out.flush();
        } catch (SQLException e) {
            SQLExceptionHandler.evaluateError(e, response, gson);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        var out = response.getWriter();
        var albumService = new AlbumService();
        try {
            var albums = albumService.findAll();
            response.setStatus(HttpServletResponse.SC_OK);
            out.print(this.gson.toJson(albums));
            out.flush();
        } catch (SQLException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(this.gson.toJson(new InternalError()));
            out.flush();
        }
    }
}
