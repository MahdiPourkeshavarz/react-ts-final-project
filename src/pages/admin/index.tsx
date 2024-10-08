import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import Categories from './components/category'
import Products from './components/product'
import Subcategories from './components/subcategory'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export function AdminPage() {
  return (
    <>
      <div className='myContainer mx-auto p-4 md:px-14 lg:px-32'>
        <div className='my-8'>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1-content'
              id='panel1-header'
            >
              <Typography variant='h5'>اضافه کردن دسته بندی</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Categories />
            </AccordionDetails>
          </Accordion>
        </div>
        <div className='mb-8'>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2-content'
              id='panel2-header'
            >
              <Typography variant='h5'>اضافه کردن زیر دسته بندی</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Subcategories />
            </AccordionDetails>
          </Accordion>
        </div>
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3-content'
              id='panel3-header'
            >
              <Typography variant='h5'>اضافه کردن محصول</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Products />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  )
}
