import { Field, Form } from 'react-final-form'

function renderTextInput(props) {
    return (
        <div>
            <label>{props.label}</label>
            <input type='text' {...props.name} {...props.placeholder} />
        </div>
    )
}

function renderDropdown(props) {
    return (
        <div>
            <label>{props.label}</label>
            <input type='select' {...props.name} {...props.placeholder} />
            {props.options.map(option => (
                <option key={option} name={option}>{option}</option>
            ))}
        </div>
    )
}

function renderCheckboxes(props) {
    return (
        <div>
            <label>{props.label}</label>
            {props.options.map(option => (
                <input type='checkbox' name={option} key={option}>{option}</input>
            ))}
        </div>
    )
}

function SellerSignupForm() {
    const countries = ['China','Indonesia','Japan','Malaysia','Thailand']
    const securityMessage = <p>All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</p>

    return(
        <>
        <Form 
            render={({ handleSubmit }) => {
                <>
                <section>
                    <h2>Basics</h2>
                    <Field
                        name='organization'
                        label='Organization name'
                        placeholder='E.g. Happy Hens'
                        component={renderTextInput}
                    />
                    <Field
                        name='website'
                        label='Website (optional)'
                        placeholder='E.g. http://marriot.com'
                        component={renderTextInput}
                    />
                </section>

                <section>
                    <h2>Location(s)</h2>
                    <div>
                        <h3>Farm location</h3>
                        <Field 
                            name='city'
                            label='City'
                            placeholder='E.g. Beijing'
                            component={renderTextInput}
                        />
                        <Field 
                            name='country'
                            label='Country'
                            placeholder='Select country'
                            options={countries}
                            component={renderDropdown}
                        >
                        </Field>
                    </div>
                    <button>+ I have an additional farm location.</button>
                    <Field 
                        name='distributionCountries'
                        label='Distribution country (countries)'
                        placeholder='Select countries to which you distribute'
                        multiple
                        options={countries}
                    />
                </section>
                
                <section>
                <h2>Contact person for purchase inquiries</h2>
                {securityMessage}
                <Field 
                    label='Full name of contact'
                    placeholder='E.g. Chung Lui'
                    name='contact name'
                    component={renderTextInput}
                />
                <Field 
                    label='Job title of contact'
                    placeholder='E.g. CEO'
                    name='contact job title'
                    component={renderTextInput}
                />
                <Field 
                    label='Available contact channels'
                    name='contact channels'
                    options={['Phone','Whatsapp','WeChat']}
                    component={renderCheckboxes}
                />
                </section>

                <section>
                <h2>Product details</h2>
                {securityMessage}
                <Field
                    label='Cage-free egg types'
                    name='cage-free egg types'
                    options={['Shell','Frozen','Liquid','Powder','Other']}
                    component={renderCheckboxes}
                />
                </section>

                <section>
                <h2>Production details</h2>
                {securityMessage}
                <h3>Cage-free egg types</h3>
                <div>
                    <input type='checkbox' name='shell' />Shell

                    <label>Total production capacity (per year)</label>
                    <input name={`shell total production capacity`} type='text' placeholder='E.g. 10,000'/>
                    <input name={`shell total production capacity unit`} type='select'>
                        <option value='eggs' selected>Eggs</option>
                        <option value='tons'>Tons</option>
                        <option value='kilograms'>Kilograms</option>
                    </input>

                    <label>Price per ton</label>
                    <input name={`shell price per ton`} type='text' placeholder='$'/>
                    <input name={`shell price per ton currency`} type='select'>
                        <option>USD</option>
                    </input>
                </div>
                {['frozen','liquid','powder','other'].map(eggType => {
                return (
                    <div key={eggType}>
                        <input type='checkbox' name={eggType} />{eggType[0].toUpperCase() + eggType.slice(1)}

                        <label>Total production capacity (per year)</label>
                        <input name={`${eggType} total production capacity`} type='text' placeholder='E.g. 3'/>
                        <input name={`${eggType} total production capacity unit`} type='select'>
                            <option value='eggs'>Eggs</option>
                            <option value='tons' selected>Tons</option>
                            <option value='kilograms'>Kilograms</option>
                        </input>

                        <label>Price per ton</label>
                        <input name={`${eggType} price per ton`} type='text' placeholder='$'/>
                        <input name={`${eggType} price per ton currency`} type='select'>
                            <option>USD</option>
                        </input>
                    </div>
                    )
                })}
                
                </section>

                <section>
                <h2>Production details</h2>
                <Field 
                    label='Production system of farm(s)'
                    name='production system'
                    options={[
                        'Aviary: multi-level cage-free system',
                        'Barn: single-level cage-free system',
                        'Fixed housing: structure does not move',
                        'Free range: cage free system that provides outdoor access',
                        'Mobile unit: house or structure on wheels'
                    ]}
                    component={renderDropdown}
                />
                <Field 
                    label='Do you have cage-free egg certification?'
                    placeholder='Select your certification status'
                    name='certification status'
                    options={[
                        'Yes, we are certified',
                        'z',
                        `No, we don't ever plan on becoming certified`
                    ]}
                    component={renderDropdown}
                />
                <Field 
                    label='Title of certifying organization'
                    placeholder='E.g. The Humane Society'
                    name='certifying organzation'
                    component={renderTextInput}
                />
                <button>Upload certificate</button>
                </section>

                <section>
                <h2>Imagery</h2>
                <p>Tip: To attract buyers, we recommend you upload at least 4 photos, including photos of eggs, of production system, and lorem ipsum.</p>
                <div>
                    <label>Photos of farm</label>
                    <button>Upload photos</button>
                </div>
                <div>
                    <label>Logo (optional)</label>
                    <button>Upload logo</button>
                </div>
                <button type='submit'>Submit for approval</button>
                </section>
                </>
            }}
            />
        </>
    )
}

export default SellerSignupForm