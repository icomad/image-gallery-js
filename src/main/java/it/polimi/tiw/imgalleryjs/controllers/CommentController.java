package it.polimi.tiw.imgalleryjs.controllers;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import it.polimi.tiw.imgalleryjs.beans.User;
import it.polimi.tiw.imgalleryjs.exceptions.*;
import it.polimi.tiw.imgalleryjs.services.CommentService;
import it.polimi.tiw.imgalleryjs.services.ImageService;
import it.polimi.tiw.imgalleryjs.utils.SQLExceptionHandler;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/comments")
@MultipartConfig
public class CommentController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private Gson gson;

    @Override
    public void init() throws ServletException {
      this.gson = new Gson();
		}
		
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			var body = request.getParameter("body");
			var imageId = request.getParameter("imageId");
			var out = response.getWriter();

			if (body == null || body.isBlank()){
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				out.print(this.gson.toJson(new CommentBodyBlank()));
				out.flush();
				return;
			}

			if (imageId == null || imageId.isBlank()){
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				out.print(this.gson.toJson(new ImageIdBlank()));
				out.flush();
				return;
			}

			var user = (User) request.getSession().getAttribute("user");
			var commentService = new CommentService();
			var imageService = new ImageService();
			try {
				var image = imageService.findOneById(Integer.parseInt(imageId));
				if (image == null){
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					out.print(this.gson.toJson(new ImageNotFound()));
					out.flush();
					return;
				}
				var comment = commentService.create(body, user.getId(), image.getId());
				
				if (comment == null){
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					var json = new JsonObject();
					json.addProperty("error", "Error while adding comment. Please try again");
					out.print(json);
					out.flush();
					return;
				}
				response.setStatus(HttpServletResponse.SC_OK);
				out.print(this.gson.toJson(comment));
				out.flush();
			} catch (SQLException e) {
				SQLExceptionHandler.evaluateError(e, response, gson);
			} catch (NumberFormatException e){
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				var json = new JsonObject();
				json.addProperty("error", "You have to pass a valid image id!");
				out.print(json);
				out.flush();
			}
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			var out = response.getWriter();
			var imageId = request.getParameter("imageId");

			if (imageId == null || imageId.isBlank()){
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					out.print(this.gson.toJson(new ImageIdBlank()));
					out.flush();
					return;
			}

			var commentService = new CommentService();
			var imageService = new ImageService();

			try {
					var image = imageService.findOneById(Integer.parseInt(imageId));
					if (image == null){
							response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
							out.print(this.gson.toJson(new ImageNotFound()));
							out.flush();
							return;
					}
					var comments = commentService.findAllByImageWithUsername(image.getId());
					var data = this.gson.toJson(comments);
					response.setStatus(HttpServletResponse.SC_OK);
					out.print(data);
					out.flush();
			} catch (SQLException e) {
					SQLExceptionHandler.evaluateError(e, response, gson);
			} catch (NumberFormatException e){
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
					var json = new JsonObject();
					json.addProperty("error", "You have to pass a valid image id!");
					out.print(json);
					out.flush();
			}
    }
}
