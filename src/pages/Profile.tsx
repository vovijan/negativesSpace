import {useAppSelector} from "../store/store";
import {Avatar, Card, CardContent, CardHeader, Typography} from "@mui/material";

const Profile = () => {
  const { userInfo } = useAppSelector((state) => state.user)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={userInfo?.avatar}
          />
        }
        title={userInfo?.username}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {userInfo?.about}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Profile