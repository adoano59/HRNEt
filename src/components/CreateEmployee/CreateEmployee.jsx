import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../../redux/employeeSlice'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import 'react-datepicker/dist/react-datepicker.css'
import './CreateEmployee.css'



const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', startDate: '',
    department: '', birthDate: '',
    street: '', city: '', state: '', zipCode: ''
  })

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formattedEmployee = {
      ...formData,
      birthDate: formData.birthDate.toISOString(),
      startDate: formData.startDate.toISOString(),
    }
    dispatch(addEmployee(formattedEmployee));
    setFormData({ firstName: '', lastName: '', startDate: '', department: '', birthDate: '', street: '', city: '', state: '', zipCode: '' });
  }
  const usStates = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
  ]


  const Department = [
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'HumanRessources', label: 'Human Ressources' },
    { value: 'Legal', label: 'Legal' },
  ]


  return (
    <form onSubmit={handleSubmit}>
      <div className='formAddEmployee'>
        <label>First Name:<input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required /></label>
        <label>Last Name:<input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required /></label>
        <label>Date of Birth:
          <DatePicker
            selected={formData.birthDate}
            onChange={(date) => handleDateChange(date, 'birthDate')}
            dateFormat="yyyy/MM/dd"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            required />
        </label>
        <label>
          Start Date:
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => handleDateChange(date, 'startDate')}
            dateFormat="yyyy/MM/dd"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            required
          />
        </label>
        <label>Street:<input name="street" placeholder="Street" value={formData.street} onChange={handleChange} required /></label>
        <label>City:<input name="city" placeholder="City" value={formData.city} onChange={handleChange} required /></label>
        <label>
          State:
          <Select
            options={usStates}
            value={usStates.find(option => option.value === formData.state)} // Définit la valeur sélectionnée
            onChange={(selectedOption) => setFormData({ ...formData, state: selectedOption.value })}
            placeholder="Select State"
          />
        </label>
        <label>Zip Code:<input name="zipCode" placeholder="Zip Code" value={formData.zipCode} onChange={handleChange} required /></label>
        <label>Department:<Select
          options={Department}
          value={Department.find(option => option.value === formData.department)} // Définit la valeur sélectionnée
          onChange={(selectedOption) => setFormData({ ...formData, department: selectedOption.value })}
          placeholder="Select Department"
        /></label>
      </div>
      <button type="submit">Add Employee</button>
    </form>
  )
}

export default CreateEmployee
