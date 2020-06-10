package it.polimi.tiw.imgalleryjs.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import it.polimi.tiw.imgalleryjs.beans.User;
import it.polimi.tiw.imgalleryjs.exceptions.*;
import it.polimi.tiw.imgalleryjs.services.AlbumService;
import it.polimi.tiw.imgalleryjs.services.ImageService;
import it.polimi.tiw.imgalleryjs.utils.SQLExceptionHandler;
import net.coobird.thumbnailator.Thumbnails;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.Date;

@WebServlet("/images")
@MultipartConfig
public class ImageController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        this.gson = new Gson();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        var out = response.getWriter();
        var resourcesPath = System.getProperty("static.resources");
        var dirPath = resourcesPath + "/static/";
        Part filePart = request.getPart("imageFile");
        var title = request.getParameter("title");
        var description = request.getParameter("description");
        var albumId = request.getParameter("albumId");

        if (title == null || title.isBlank()){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(this.gson.toJson(new ImageTitleBlank()));
            out.flush();
            return;
        }
        if (description == null || description.isBlank()){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(this.gson.toJson(new ImageDescriptionBlank()));
            out.flush();
            return;
        }
        if (albumId == null || albumId.isBlank()){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(this.gson.toJson(new AlbumIdBlank()));
            out.flush();
            return;
        }
        if (filePart == null){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(this.gson.toJson(new ImageBlank()));
            out.flush();
            return;
        }

        var user = (User) request.getSession().getAttribute("user");
        var filePath = this.saveImageToStorage(filePart, dirPath);
        var imageService = new ImageService();
        var albumService = new AlbumService();
        try {
            var album = albumService.findOneById(Integer.parseInt(albumId));
            if (album == null){
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print(this.gson.toJson(new AlbumNotFound()));
                out.flush();
                return;
            }

            var image = imageService.create(title, description, user.getId(), album.getId(), filePath);
            if (image == null){
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                var json = new JsonObject();
                json.addProperty("error", "Error while adding image. Please try again");
                out.print(json);
                out.flush();
                return;
            }
            response.setStatus(HttpServletResponse.SC_OK);
            out.print(this.gson.toJson(image));
            out.flush();
        } catch (SQLException e) {
            SQLExceptionHandler.evaluateError(e, response, gson);
        } catch (NumberFormatException e){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            var json = new JsonObject();
            json.addProperty("error", "You have to pass a valid id!");
            out.print(json);
            out.flush();
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        var out = response.getWriter();
        var albumId = request.getParameter("albumId");

        if (albumId == null || albumId.isBlank()){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(this.gson.toJson(new AlbumIdBlank()));
            out.flush();
            return;
        }

        var albumService = new AlbumService();
        var imageService = new ImageService();

        try {
            var album = albumService.findOneById(Integer.parseInt(albumId));
            if (album == null){
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print(this.gson.toJson(new AlbumNotFound()));
                out.flush();
                return;
            }
            var images = imageService.findAllByAlbum(album.getId());
            var data = this.gson.toJson(images);
            response.setStatus(HttpServletResponse.SC_OK);
            out.print(data);
            out.flush();
        } catch (SQLException e) {
            SQLExceptionHandler.evaluateError(e, response, gson);
        } catch (NumberFormatException e){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            var json = new JsonObject();
            json.addProperty("error", "You have to pass a valid id!");
            out.print(json);
            out.flush();
        }
    }

    private String saveImageToStorage(Part filePart, String dirPath) throws IOException {
        File f = new File(dirPath);
        if (!f.isDirectory()) f.mkdir();
        String ogFileName = Paths.get(filePart.getSubmittedFileName()).getFileName().toString();
        String uniqueId = Long.toString(new Date().getTime());
        String fileName = uniqueId + ogFileName;
        File targetFile = new File(dirPath + fileName);
        File thumbnailFile = new File(dirPath + "thumbnail_" + fileName);
        try (var output = new FileOutputStream(targetFile); var thumbnail = new FileOutputStream(thumbnailFile); var thumbnailContent = filePart.getInputStream(); var fileContent = filePart.getInputStream();) {
            fileContent.transferTo(output);
            Thumbnails.of(thumbnailContent).size(200, 200).toOutputStream(thumbnail);
        }
        return fileName;
    }
}
