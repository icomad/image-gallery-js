package it.polimi.tiw.imgalleryjs.services;

import it.polimi.tiw.imgalleryjs.beans.Comment;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class CommentService {
	private DataSource ds;

	public CommentService(){
			try {
					this.ds = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/jsdb");
			} catch (NamingException e) {
					e.printStackTrace();
			}
	}

	public Comment mapDBToBean(ResultSet rs) throws SQLException {
			var comment = new Comment();
			comment.setId(rs.getInt("id"));
			comment.setUserId(rs.getInt("user_id"));
			comment.setImageId(rs.getInt("image_id"));
			comment.setBody(rs.getString("body"));
			comment.setCreatedAt(rs.getTimestamp("created_at"));
			return comment;
	}

	public Comment findOneById(int id) throws SQLException{
			var query = "SELECT * FROM comments WHERE id = ?";
			try(var connection = this.ds.getConnection(); var pStatement = connection.prepareStatement(query);){
					pStatement.setInt(1, id);
					try(var rs = pStatement.executeQuery();){
							if (rs.next()) return this.mapDBToBean(rs);
							return null;
					}
			}
	}

	public HashMap<String, Object> findOneByIdWithUsername(int id) throws SQLException{
		var query = "SELECT * FROM comments c JOIN users u on c.user_id = u.id WHERE c.id = ?";
		try(var connection = this.ds.getConnection(); var pStatement = connection.prepareStatement(query);){
				pStatement.setInt(1, id);
				try(var rs = pStatement.executeQuery();){
						if (rs.next()) {
							var map = new HashMap<String, Object>();
							map.put("comment", this.mapDBToBean(rs));
							map.put("username", rs.getString("username"));
							return map;
						}
						return null;
				}
		}
	}

	public List<Comment> findAllByImage(int imageId) throws SQLException{
		var query = "SELECT * FROM comments WHERE image_id=? ORDER BY created_at";
		var comments = new ArrayList<Comment>();
		try(var connection = this.ds.getConnection();
				var pStatement = connection.prepareStatement(query);){
				pStatement.setInt(1, imageId);
				try(var rs = pStatement.executeQuery();){
						while (rs.next()){
								comments.add(this.mapDBToBean(rs));
						}
				}
		}
		return comments;
	}

	public List<HashMap<String, Object>> findAllByImageWithUsername(int imageId) throws SQLException{
		var query = "SELECT * FROM comments JOIN users u on comments.user_id = u.id WHERE image_id=? ORDER BY created_at";
		var comments = new ArrayList<HashMap<String, Object>>();
		try(var connection = this.ds.getConnection();
			var pStatement = connection.prepareStatement(query);){
			pStatement.setInt(1, imageId);
			try(var rs = pStatement.executeQuery();){
				while (rs.next()){
					var map = new HashMap<String, Object>();
					map.put("comment", this.mapDBToBean(rs));
					map.put("username", rs.getString("username"));
					comments.add(map);
				}
			}
		}
		return comments;
	}

	public HashMap<String, Object> create(String body, int userId, int imageId) throws SQLException{
		var query = "INSERT INTO comments(body, user_id, image_id) VALUES (?, ?, ?)";
		try(var connection = this.ds.getConnection(); var pStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);){
				pStatement.setString(1, body);
				pStatement.setInt(2, userId);
				pStatement.setInt(3, imageId);
				pStatement.executeUpdate();
				try(var rs = pStatement.getGeneratedKeys();){
						if (rs.next()) return this.findOneByIdWithUsername(rs.getInt(1));
						return null;
				}
		}
	}
}
