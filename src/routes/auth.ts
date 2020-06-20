import { Router } from 'express';

import Auth from '../controllers/auth';
import { signIn, verify } from '../services/passport';

const router = Router();

router.put('/signup', Auth.signUp);
router.post('/signin', signIn, Auth.signIn);
router.post('/verify', verify, Auth.signIn);

export default router;
