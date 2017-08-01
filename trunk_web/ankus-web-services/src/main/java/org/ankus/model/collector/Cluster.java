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
// Generated on: 2013.09.21 at 10:54:40 오전 KST 
//


package org.ankus.model.collector;

import javax.xml.bind.annotation.*;
import java.io.Serializable;


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
 *         &lt;element name="fs.default.name" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="mapred.job.tracker" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element ref="{http://www.openankus.org/schema/collector}properties" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attribute name="name" use="required" type="{http://www.w3.org/2001/XMLSchema}string" />
 *       &lt;attribute name="description" type="{http://www.w3.org/2001/XMLSchema}string" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "fsDefaultName",
    "mapredJobTracker",
    "properties"
})
@XmlRootElement(name = "cluster")
public class Cluster  implements Serializable {

    @XmlElement(name = "fs.default.name", required = true)
    protected String fsDefaultName;
    @XmlElement(name = "mapred.job.tracker", required = true)
    protected String mapredJobTracker;
    protected Properties properties;
    @XmlAttribute(name = "name", required = true)
    protected String name;
    @XmlAttribute(name = "description")
    protected String description;

    /**
     * Gets the value of the fsDefaultName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFsDefaultName() {
        return fsDefaultName;
    }

    /**
     * Sets the value of the fsDefaultName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFsDefaultName(String value) {
        this.fsDefaultName = value;
    }

    /**
     * Gets the value of the mapredJobTracker property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMapredJobTracker() {
        return mapredJobTracker;
    }

    /**
     * Sets the value of the mapredJobTracker property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMapredJobTracker(String value) {
        this.mapredJobTracker = value;
    }

    /**
     * Gets the value of the properties property.
     * 
     * @return
     *     possible object is
     *     {@link Properties }
     *     
     */
    public Properties getProperties() {
        return properties;
    }

    /**
     * Sets the value of the properties property.
     * 
     * @param value
     *     allowed object is
     *     {@link Properties }
     *     
     */
    public void setProperties(Properties value) {
        this.properties = value;
    }

    /**
     * Gets the value of the name property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the value of the name property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setName(String value) {
        this.name = value;
    }

    /**
     * Gets the value of the description property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the value of the description property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDescription(String value) {
        this.description = value;
    }

}
