import React from "react";
import {
  X,
  Calendar,
  MapPin,
  User,
  Music,
  CreditCard,
  Users,
  Star,
  Layers,
  Disc,
} from "lucide-react";
import "./DetailsModal.css";

const DetailsModal = ({
  isOpen,
  onClose,
  type,
  data,
  loading,
  onRelatedClick,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {loading ? (
          <div className="modal-loading">
            <div className="spinner"></div> Carregando...
          </div>
        ) : !data ? (
          <div className="modal-error">Dados não encontrados.</div>
        ) : (
          <>
            <div className="modal-header">
              <div className="modal-image-container">
                <img
                  src={
                    data.front_image ||
                    data.image ||
                    data.cover ||
                    "/default.jpg"
                  }
                  alt={data.name || data.stage_name}
                  className="modal-main-image"
                />
                {type === "photocards" && data.back_image && (
                  <img
                    src={data.back_image}
                    alt="Verso"
                    className="modal-sub-image"
                  />
                )}
              </div>
              <div className="modal-title-section">
                <span className="modal-chip">
                  {type === "artists" ? data.category : type.toUpperCase()}
                </span>
                <h2>{data.name || data.stage_name || data.full_name}</h2>
                {data.artist_name && <h3>{data.artist_name}</h3>}
              </div>
            </div>

            <div className="modal-body">
              {type === "photocards" && (
                <>
                  <div className="info-grid">
                    <div className="info-item">
                      <CreditCard size={18} />{" "}
                      <span>
                        {data.front_finish} / {data.back_finish}
                      </span>
                    </div>
                    <div className="info-item">
                      <span>
                        {data.LENGTH}cm x {data.WIDTH}cm
                      </span>
                    </div>
                  </div>

                  {data.related_set && data.related_set.length > 0 && (
                    <div className="related-section">
                      <h4>
                        <Layers size={16} /> Do Mesmo Set
                      </h4>
                      <div className="horizontal-scroll-list">
                        {data.related_set.map((pc) => (
                          <div
                            key={pc.id}
                            className="preview-card"
                            onClick={() => onRelatedClick("photocards", pc.id)}
                            title={pc.NAME}
                          >
                            <img
                              src={pc.front_image || "/default-card.jpg"}
                              alt={pc.NAME}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.related_release && data.related_release.length > 0 && (
                    <div className="related-section">
                      <h4>
                        <Disc size={16} /> Do Mesmo Release (Era)
                      </h4>
                      <div className="horizontal-scroll-list">
                        {data.related_release.map((pc) => (
                          <div
                            key={pc.id}
                            className="preview-card"
                            onClick={() => onRelatedClick("photocards", pc.id)}
                            title={pc.NAME}
                          >
                            <img
                              src={pc.front_image || "/default-card.jpg"}
                              alt={pc.NAME}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {type === "artists" && (
                <>
                  <div className="info-grid">
                    <div className="info-item">
                      <span>
                        <strong>Empresa:</strong> {data.company || "N/A"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span>
                        <strong>Status:</strong> {data.status || "Ativo"}
                      </span>
                    </div>
                  </div>

                  {data.category !== "Solo" &&
                    data.members &&
                    data.members.length > 0 && (
                      <div className="members-section">
                        <h4>
                          <Users size={16} /> Membros
                        </h4>
                        <div className="mini-list">
                          {data.members.map((member) => (
                            <div key={member.id} className="mini-card">
                              <img
                                src={member.image || "/default-idol.jpg"}
                                alt={member.stage_name}
                              />
                              <div className="mini-info">
                                <strong>{member.stage_name}</strong>
                                <span>{member.main_position}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </>
              )}

              {type === "idols" && (
                <>
                  <div className="info-grid">
                    <div className="info-item">
                      <User size={18} /> <span>{data.full_name}</span>
                    </div>
                    <div className="info-item">
                      <Calendar size={18} />{" "}
                      <span>{formatDate(data.birth_date)}</span>
                    </div>
                    <div className="info-item">
                      <MapPin size={18} />{" "}
                      <span>
                        {data.city}, {data.nationality}
                      </span>
                    </div>
                    {data.mbti && (
                      <div className="info-item">
                        <span className="mbti-badge">{data.mbti}</span>
                      </div>
                    )}
                  </div>

                  {data.groups && data.groups.length > 0 && (
                    <div className="members-section">
                      <h4>
                        <Star size={16} /> Carreira / Grupos
                      </h4>
                      <div className="mini-list">
                        {data.groups.map((group) => (
                          <div key={group.id} className="mini-card">
                            <img
                              src={group.image || "/default-artist.jpg"}
                              alt={group.NAME}
                            />
                            <div className="mini-info">
                              <strong>{group.NAME}</strong>
                              <span>{group.main_position}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {type === "releases" && (
                <div className="info-grid">
                  <div className="info-item">
                    <Calendar size={18} /> <span>{formatDate(data.date)}</span>
                  </div>
                  <div className="info-item">
                    <Music size={18} />{" "}
                    <span>
                      {data.type} ({data.origin})
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsModal;
