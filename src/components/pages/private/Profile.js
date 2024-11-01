import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { FiUser, FiActivity, FiCalendar, FiUserCheck, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useProfile } from '../../contexts/ProfileContext';
import styles from '../../../styles/assets/Profile.module.css';

const Profile = ({ profile, mobile, imageSize = 55 }) => {
  const {
    id,
    name,
    profile_picture,
    username,
    workouts_count,
    following_id,
    followers_count,
    following_count
  } = profile;

  const { user } = useAuth();
  const { handleFollow, handleUnfollow } = useProfile();
  const is_owner = user?.username === username;

  const handleFollowClick = async () => {
    if (following_id) {
      await handleUnfollow(profile);
    } else {
      await handleFollow(profile);
    }
  };

  return (
    <Card className={`${styles.Profile} ${mobile ? styles.Mobile : ''} my-3`}>
      <div className={styles.ProfileContent}>
        <Link to={`/profile/${id}`} className={styles.ImageLink}>
          <div 
            className={styles.ImageWrapper} 
            style={{ width: imageSize, height: imageSize }}
          >
            {profile_picture ? (
              <img
                src={profile_picture}
                alt={name}
                className={styles.ProfileImage}
              />
            ) : (
              <FiUser size={imageSize * 0.6} className={styles.DefaultAvatar} />
            )}
          </div>
        </Link>

        <div className={styles.ProfileInfo}>
          <Link to={`/profile/${id}`} className={styles.NameLink}>
            <h6 className="mb-0">{name || username}</h6>
            {name && <small className="text-muted">@{username}</small>}
          </Link>

          {!mobile && (
            <div className={styles.Stats}>
              <div className={styles.StatItem}>
                <FiActivity />
                <small>{workouts_count || 0} workouts</small>
              </div>
              <div className={styles.StatItem}>
                <FiUserCheck />
                <small>{followers_count || 0} followers</small>
              </div>
              <div className={styles.StatItem}>
                <FiCalendar />
                <small>{following_count || 0} following</small>
              </div>
            </div>
          )}
        </div>

        {!mobile && !is_owner && user && (
          <div className={styles.FollowButton}>
            <Button
              variant={following_id ? "outline-primary" : "primary"}
              size="sm"
              onClick={handleFollowClick}
              className={styles.FollowBtn}
            >
              {following_id ? (
                <>
                  <FiUserCheck className="me-1" />
                  Following
                </>
              ) : (
                <>
                  <FiUserPlus className="me-1" />
                  Follow
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Profile;