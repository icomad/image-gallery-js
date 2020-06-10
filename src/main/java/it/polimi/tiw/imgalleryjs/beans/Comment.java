package it.polimi.tiw.imgalleryjs.beans;

import java.util.Date;

public class Comment {
    private int id;
    private int userId;
		private int imageId;
		private String body;
		private Date createdAt;

    public Comment() { }

    public Comment(int id, int userId, int imageId, String body, Date createdAt) {
        this.id = id;
        this.userId = userId;
				this.imageId = imageId;
				this.body = body;
				this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getImageId() {
        return imageId;
    }

    public void setImageId(int imageId) {
        this.imageId = imageId;
		}
		
		public String getBody() {
			return body;
		}

		public void setBody(String body) {
				this.body = body;
		}

		public Date getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(Date createdAt) {
				this.createdAt = createdAt;
		}
}
