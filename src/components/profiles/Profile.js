import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { FiUser, FiActivity, FiCalendar, FiUserCheck, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../contexts/ProfileContext';
import styles from '../../styles/Profile.module.css';

const Profile = ({ profile = {}, mobile = false, imageSize = 55 }) => {

  const { user: currentUser } = useAuth();
  const { handleFollow, handleUnfollow } = useProfile();

  if (!profile) {
    return null;
  }

  const {
    id = null,
    name = '',
    profile_picture = null,
    user = {},
    workouts_count = 0,
    followers_count = 0,
    following_count = 0,
    fitness_goals = '',
  } = profile;

  if (!id) {
    return null;
  }

  const is_owner = currentUser?.id === user?.id;

  const handleFollowClick = async () => {
    try {
      if (profile.is_following) {
        await handleUnfollow(profile);
      } else {
        await handleFollow(profile);
      }
    } catch (err) {
      console.error('Error handling follow/unfollow:', err);
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
                alt={name || user.username}
                className={styles.ProfileImage}
              />
            ) : (
              <FiUser size={imageSize * 0.6} className={styles.DefaultAvatar} />
            )}
          </div>
        </Link>

        <div className={styles.ProfileInfo}>
          <Link to={`/profile/${id}`} className={styles.NameLink}>
            <h6 className="mb-0">{name || user.username}</h6>
            {name && <small className="text-muted">@{user.username}</small>}
          </Link>

          {!mobile && (
            <div className={styles.Stats}>
              <div className={styles.StatItem}>
                <FiActivity />
                <small>{workouts_count} workouts</small>
              </div>
              <div className={styles.StatItem}>
                <FiUserCheck />
                <small>{followers_count} followers</small>
              </div>
              <div className={styles.StatItem}>
                <FiCalendar />
                <small>{following_count} following</small>
              </div>
            </div>
          )}

          {!mobile && fitness_goals && (
            <small className="text-muted d-block mt-1">
              {fitness_goals.substring(0, 60)}
              {fitness_goals.length > 60 && '...'}
            </small>
          )}
        </div>

        {!mobile && !is_owner && currentUser && (
          <div className={styles.FollowButton}>
            <Button
              variant={profile.is_following ? "outline-primary" : "primary"}
              size="sm"
              onClick={handleFollowClick}
              className={styles.FollowBtn}
            >
              {profile.is_following ? (
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