import { Router } from 'express';
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  exportLeadsCSV,
} from '../controllers/leadController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.use(protect);

router.get('/export', exportLeadsCSV);
router.get('/', getLeads);
router.post('/', createLead);
router.get('/:id', getLead);
router.put('/:id', updateLead);
router.delete('/:id', adminOnly, deleteLead);

export default router;