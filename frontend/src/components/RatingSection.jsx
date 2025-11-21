import React from "react";
import { Trophy, Medal, Crown, Star, User, Users } from "lucide-react";
import "./RatingSection.css";

const RateItem = ({ item, index, type }) => {
  let RankIcon;
  let rankClass = "";

  // Define ícones e cores para 1º, 2º e 3º lugar
  switch (index) {
    case 0:
      RankIcon = Crown;
      rankClass = "pos-1";
      break;
    case 1:
      RankIcon = Medal;
      rankClass = "pos-2";
      break;
    case 2:
      RankIcon = Medal;
      rankClass = "pos-3";
      break;
    default:
      RankIcon = Star;
      rankClass = "pos-common";
  }

  return (
    <div className={`rating-item ${rankClass}`}>
      <div className="rating-position">
        <span className="rating-number">#{index + 1}</span>
        <div className="rating-icon-wrapper">
          <RankIcon size={index === 0 ? 20 : 16} />
        </div>
      </div>

      <div className="rating-user-info">
        <span className="rating-name">{item.user_name}</span>
        {type === "gom" && item.community && (
          <span className="rating-community">{item.community}</span>
        )}
      </div>

      <div className="rating-score">
        <Star size={12} fill="currentColor" />
        <span>{Number(item.rating).toFixed(1)}</span>
      </div>
    </div>
  );
};

export const RatingSection = ({ topGoms, topCollectors, loading }) => {
  if (loading) return null;

  return (
    <div className="ratings-container">
      {/* Card GOMs */}
      <div className="rating-card">
        <div className="rating-header">
          <div className="rating-header-icon gom-bg">
            <Users size={20} />
          </div>
          <h3>Top 5 GOMs</h3>
        </div>
        <div className="rating-list">
          {topGoms?.length > 0 ? (
            topGoms.map((gom, idx) => (
              <RateItem key={idx} item={gom} index={idx} type="gom" />
            ))
          ) : (
            <p className="empty-rating">Nenhum GOM avaliado ainda.</p>
          )}
        </div>
      </div>

      {/* Card Collectors */}
      <div className="rating-card">
        <div className="rating-header">
          <div className="rating-header-icon col-bg">
            <User size={20} />
          </div>
          <h3>Top 5 Collectors</h3>
        </div>
        <div className="rating-list">
          {topCollectors?.length > 0 ? (
            topCollectors.map((col, idx) => (
              <RateItem key={idx} item={col} index={idx} type="collector" />
            ))
          ) : (
            <p className="empty-rating">Nenhum Collector avaliado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
};
