package it.polimi.tiw.imgalleryjs.services;

import it.polimi.tiw.imgalleryjs.beans.Album;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class AlbumService {
    private DataSource ds;

    public AlbumService(){
        try {
            this.ds = (DataSource) new InitialContext().lookup("java:comp/env/jdbc/jsdb");
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }

    public Album mapDBToBean(ResultSet rs) throws SQLException {
        var album = new Album();
        album.setId(rs.getInt("id"));
        album.setTitle(rs.getString("title"));
        album.setUserId(rs.getInt("user_id"));
        album.setCreatedAt(rs.getTimestamp("created_at"));
        album.setOrder(rs.getInt("sort_order"));
        return album;
    }

    public Album findOneById(int id) throws SQLException{
        var query = "SELECT * FROM albums WHERE id = ?";
        try(var connection = this.ds.getConnection(); var pStatement = connection.prepareStatement(query);){
            pStatement.setInt(1, id);
            try(var rs = pStatement.executeQuery();){
                if (rs.next()) return this.mapDBToBean(rs);
                return null;
            }
        }
    }

    public List<Album> findAll() throws SQLException{
        var query = "SELECT * FROM albums ORDER BY sort_order DESC";
        var albums = new ArrayList<Album>();
        try(var connection = this.ds.getConnection();
            var pStatement = connection.prepareStatement(query);
            var rs = pStatement.executeQuery();){
            while (rs.next()){
                albums.add(this.mapDBToBean(rs));
            }
        }
        return albums;
    }

    public List<Album> findAllByUser(int userId) throws SQLException{
        var query = "SELECT * FROM albums WHERE user_id = ? ORDER BY sort_order DESC";
        var albums = new ArrayList<Album>();
        try(var connection = this.ds.getConnection(); var pStatement = connection.prepareStatement(query);){
            pStatement.setInt(1, userId);
            try(var rs = pStatement.executeQuery();){
                while (rs.next()){
                    albums.add(this.mapDBToBean(rs));
                }
            }
        }
        return albums;
    }

    public Album create(String title, int userId) throws SQLException{
        var order = this.findLastOrderInserted() + 1;
        var query = "INSERT INTO albums(title, user_id, sort_order) VALUES (?, ?, ?)";
        try(var connection = this.ds.getConnection(); var pStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);){
            pStatement.setString(1, title);
            pStatement.setInt(2, userId);
            pStatement.setInt(3, order);
            pStatement.executeUpdate();
            try(var rs = pStatement.getGeneratedKeys();){
                if (rs.next()) return this.findOneById(rs.getInt(1));
                return null;
            }
        }
    }

    public void updateOrder(int albumId, int newOrder) throws SQLException{
        var query = "UPDATE albums SET sort_order = ? WHERE id = ?";
        try(var connection = this.ds.getConnection(); var pStatement = connection.prepareStatement(query);){
            pStatement.setInt(1, newOrder);
            pStatement.setInt(2, albumId);
            pStatement.executeUpdate();
        }
    }

    private int findLastOrderInserted() throws SQLException{
        var query = "SELECT MAX(sort_order) FROM albums";
        try(var connection = this.ds.getConnection(); var pStatement = connection.prepareStatement(query); var rs = pStatement.executeQuery();) {
            if (rs.next()) return rs.getInt(1);
            return 1;
        }
    }
}
