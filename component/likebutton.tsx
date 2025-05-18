import { Heart } from "lucide-react";
import { useState } from "react";

export function LikeButton({
  defaultLiked,
  id,
  onLiked,
}: {
  defaultLiked: boolean;
  id: string;
  onLiked: () => void;
}) {
  const [isLiked, setIsLiked] = useState(defaultLiked);

  const handleClick = async () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    await updateIsLiked(newLiked);
    onLiked();
  };

  const updateIsLiked = async (liked: boolean) => {
    let res: Response;

    if (liked) {
      res = await fetch(`/api/recipes/like/${id}`);
    } else {
      res = await fetch(`/api/recipes/dislike/${id}`);
    }

    if (res.ok) {
      alert("Berhasil Like/Unlike Resep!");
    } else {
      alert("Gagal Like/Unlike Resep!");
    }
  };

  return (
    <button onClick={handleClick}>
      <Heart className={isLiked ? "fill-red-500" : ""} />
    </button>
  );
}
