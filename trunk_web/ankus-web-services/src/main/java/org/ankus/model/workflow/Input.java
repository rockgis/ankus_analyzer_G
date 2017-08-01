/**
 * This file is part of ankus.
 *
 * ankus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ankus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ankus.  If not, see <http://www.gnu.org/licenses/>.
 */

//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, vhudson-jaxb-ri-2.1-2 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2013.11.30 at 02:11:34 오후 KST 
//


package org.ankus.model.workflow;

import javax.xml.bind.annotation.*;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;choice>
 *           &lt;element ref="{http://www.openankus.org/schema/workflow}inputPaths"/>
 *         &lt;/choice>
 *       &lt;/sequence>
 *       &lt;attribute name="excludeOnNotExist" type="{http://www.w3.org/2001/XMLSchema}boolean" default="true" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "inputPaths"
})
@XmlRootElement(name = "input")
public class Input {

    protected InputPaths inputPaths;
    @XmlAttribute(name = "excludeOnNotExist")
    protected Boolean excludeOnNotExist;

    /**
     * Gets the value of the inputPaths property.
     * 
     * @return
     *     possible object is
     *     {@link InputPaths }
     *     
     */
    public InputPaths getInputPaths() {
        return inputPaths;
    }

    /**
     * Sets the value of the inputPaths property.
     * 
     * @param value
     *     allowed object is
     *     {@link InputPaths }
     *     
     */
    public void setInputPaths(InputPaths value) {
        this.inputPaths = value;
    }

    /**
     * Gets the value of the excludeOnNotExist property.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public boolean isExcludeOnNotExist() {
        if (excludeOnNotExist == null) {
            return true;
        } else {
            return excludeOnNotExist;
        }
    }

    /**
     * Sets the value of the excludeOnNotExist property.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setExcludeOnNotExist(Boolean value) {
        this.excludeOnNotExist = value;
    }

}
