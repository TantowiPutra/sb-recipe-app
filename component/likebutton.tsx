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
    await updateIsLiked();
    onLiked();
  };

  const updateIsLiked = async () => {
    let res: Response;
    const newLiked = !isLiked;

    if (newLiked) {
      res = await fetch(`/api/recipes/like/${id}`);
    } else {
      res = await fetch(`/api/recipes/dislike/${id}`);
    }

    if (res.ok) {
      alert("Berhasil Like/Unlike Resep!");
      setIsLiked(newLiked);
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
