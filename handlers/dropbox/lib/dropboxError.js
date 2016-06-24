
module.exports = class DropboxError extends Error {
  constructor(response) {
    
    super(response.error_summary);
    this.response = response;
    this.message = response.error_summary;
  }
};
