export default function CommentValid(comment, setIsValid) {
  // 댓글과 대댓글 1자 이상 200자 이하 공백포함X
  const commentRegex = /^[\s\S]{1,200}$/u;
  const commentIsValid = commentRegex.test(comment);
  setIsValid(commentIsValid);
}
