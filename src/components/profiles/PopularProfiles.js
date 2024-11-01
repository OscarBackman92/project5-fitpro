import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiUser, FiActivity } from 'react-icons/fi';
import { useProfile } from '../../contexts/ProfileContext';
import LoadingSpinner from '../layout/LoadingSpinner';
import styles from './PopularProfiles.module.css';

const PopularProfiles = ({ mobile }) => {
  const { profileData } = useProfile();
  const { popularProfiles } = profileData;

  if (!popularProfiles?.results) {
    return <LoadingSpinner />;
  }

  const ProfileCard = ({ profile }) => (
    <Card className={`${styles.ProfileCard} ${mobile ? styles.Mobile : ''}`}>
      <div className={styles.ProfileImageWrapper}>
        {profile.profile_picture ? (
          <img
            src={profile.profile_picture}
            alt={profile.name}
            className={styles.ProfileImage}
          />
        ) : (
          <FiUser size={mobile ? 24 : 32} />
        )}
      </div>
      <Card.Body className="p-2 text-center">
        <Link to={`/profile/${profile.id}`} className={styles.ProfileLink}>
          <Card.Title className="mb-0">{profile.name}</Card.Title>
        </Link>
        <div className={styles.Stats}>
          <div>
            <FiActivity />
            <small>{profile.workouts_count || 0}</small>
          </div>
          <div>
            <small>{profile.followers_count || 0} followers</small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container className={mobile ? 'd-lg-none mb-3' : ''}>
      {mobile ? (
        <Row className="flex-nowrap overflow-auto">
          {popularProfiles.results.slice(0, 8).map((profile) => (
            <Col key={profile.id} xs={6} sm={4} className="px-2">
              <ProfileCard profile={profile} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          {popularProfiles.results.map((profile) => (
            <Col key={profile.id} xs={12} className="mb-3">
              <ProfileCard profile={profile} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default PopularProfiles;