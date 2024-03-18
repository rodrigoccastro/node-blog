class PostDto {
    constructor(id, title, text, userId, createDate) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.userId = userId;
        this.createDate = createDate;
    }
  }
  
  module.exports = PostDto;