"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  const [imgSrc, setImgSrc] = useState(workout.image || "/hero-gym.jpg");

  return (
    <Link href={`/workout/${workout.id}`} className="workout-card">
      <div>
        <div className="card-thumbnail">
          <Image
            src={imgSrc}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImgSrc("/hero-gym.jpg")}
          />
        </div>

        <div className="card-tags">
          {workout.muscleGroups?.map((muscle, index) => (
            <span key={index} className="badge-tag">
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="card-title">
          {workout.name}
        </h3>

        <p className="card-equipment">
          {workout.equipment}
        </p>
      </div>

      <div className="card-stats">
        <div className="stat-item">
          <Clock className="w-3.5 h-3.5" />
          <span>{workout.duration} min</span>
        </div>
        <div className="stat-item">
          <Flame className="w-3.5 h-3.5" />
          <span>{workout.caloriesBurned} kcal</span>
        </div>
        <div className="stat-item">
          <Star className="w-3.5 h-3.5" />
          <span>{workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
